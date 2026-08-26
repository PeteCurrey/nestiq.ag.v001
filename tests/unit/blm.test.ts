import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parseBLM, blmTenure } from "../../lib/integrations/blm";

const feed = readFileSync(join(process.cwd(), "tests/fixtures/sample.blm"), "utf8");
const result = parseBLM(feed, "agency-uuid", "Northgate Residential", "branch-1");

test("reads the version from the header", () => {
  assert.equal(result.version, "3");
});

test("parses valid records and rejects the rest", () => {
  assert.equal(result.properties.length, 3);
  assert.equal(result.rejected.length, 2);
});

test("skips withdrawn listings rather than importing them", () => {
  const withdrawn = result.rejected.find((r) => r.agentRef === "CH0015");
  assert.ok(withdrawn, "CH0015 should be rejected");
  assert.match(withdrawn.reason, /PUBLISHED_FLAG/);
  assert.ok(!result.properties.some((p) => p.reference === "CH0015"));
});

test("rejects a record with no usable price instead of importing it as zero", () => {
  const noPrice = result.rejected.find((r) => r.agentRef === "CH0016");
  assert.ok(noPrice, "CH0016 should be rejected");
  assert.match(noPrice.reason, /PRICE/);
});

test("maps sale listings, price qualifiers and property types", () => {
  const p = result.properties.find((x) => x.reference === "CH0012")!;
  assert.equal(p.listingType, "sale");
  assert.equal(p.price, 285000);
  assert.equal(p.propertyType, "Semi-Detached");
  assert.equal(p.bedrooms, 3);
  assert.equal(p.bathrooms, 2);
  assert.match(p.title, /Guide Price/);
  assert.equal(p.address.postcode, "S40 1UL");
  assert.equal(p.address.town, "Chesterfield");
  assert.equal(p.epcRating, "C");
  assert.equal(p.councilTaxBand, "D");
  assert.deepEqual(p.coordinates, { lat: 53.235, lng: -1.421 });
});

test("collects indexed media with captions, in order", () => {
  const p = result.properties.find((x) => x.reference === "CH0012")!;
  assert.equal(p.photos.length, 2);
  assert.equal(p.photos[0].url, "https://cdn.example.com/a1.jpg");
  assert.equal(p.photos[0].caption, "Front elevation");
  assert.equal(p.floorplanUrl, "https://cdn.example.com/fp1.gif");
});

test("maps lettings including rent frequency", () => {
  const p = result.properties.find((x) => x.reference === "CH0013")!;
  assert.equal(p.listingType, "rent");
  assert.equal(p.price, 795);
  assert.equal(p.rentFrequency, "per_month");
  assert.equal(p.propertyType, "Flat");
});

test("maps sold-STC to under_offer rather than dropping it", () => {
  const p = result.properties.find((x) => x.reference === "CH0014")!;
  assert.equal(p.status, "under_offer");
  assert.match(p.title, /Offers in Excess of/);
});

test("collects only populated features", () => {
  const p = result.properties.find((x) => x.reference === "CH0014")!;
  assert.deepEqual(p.features, ["Off road parking"]);
});

test("honours a non-default field separator declared in the header", () => {
  const piped = feed
    .replace("EOF : '^'", "EOF : '|'")
    .replace(/\^/g, "|");
  const r = parseBLM(piped, "agency-uuid", "Northgate Residential");
  assert.equal(r.properties.length, 3);
});

test("reports a missing DATA section instead of returning silently empty", () => {
  const r = parseBLM("#HEADER#\nVersion : 3\n", "a", "b");
  assert.equal(r.properties.length, 0);
  assert.equal(r.rejected.length, 1);
  assert.match(r.rejected[0].reason, /DEFINITION.*DATA/);
});

test("maps tenure codes", () => {
  assert.equal(blmTenure("1"), "Freehold");
  assert.equal(blmTenure("2"), "Leasehold");
  assert.equal(blmTenure(undefined), undefined);
});
