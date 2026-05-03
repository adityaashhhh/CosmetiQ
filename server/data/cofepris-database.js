/**
 * COFEPRIS Mock Regulatory Database
 * 
 * This dataset models the Mexican COFEPRIS cosmetic ingredient regulations.
 * Each entry contains:
 *   - name: INCI name of the ingredient
 *   - status: "allowed" | "restricted" | "banned"
 *   - maxConcentration: Maximum allowed % (null if banned or unrestricted)
 *   - category: Ingredient functional category
 *   - casNumber: CAS registry number
 *   - notes: Regulatory notes and conditions
 *   - reference: COFEPRIS regulatory reference
 */

const cofeprisDatabase = [
  // ==========================================
  // ALLOWED INGREDIENTS (with concentration limits)
  // ==========================================
  {
    name: "Niacinamide",
    status: "allowed",
    maxConcentration: 10,
    category: "Active",
    casNumber: "98-92-0",
    notes: "Permitted as conditioning agent. Maximum 10% in leave-on products.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Salicylic Acid",
    status: "restricted",
    maxConcentration: 2,
    category: "Active",
    casNumber: "69-72-7",
    notes: "Restricted to 2% in leave-on products. Not for children under 3 years. Must include warning label.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex I"
  },
  {
    name: "Glycolic Acid",
    status: "restricted",
    maxConcentration: 10,
    category: "Active",
    casNumber: "79-14-1",
    notes: "Maximum 10% in consumer products, pH must not be below 3.5. Professional use up to 30%.",
    reference: "COFEPRIS Acuerdo 2015"
  },
  {
    name: "Hyaluronic Acid",
    status: "allowed",
    maxConcentration: 5,
    category: "Active",
    casNumber: "9004-61-9",
    notes: "No specific restrictions. Maximum recommended concentration 5%.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Retinol",
    status: "restricted",
    maxConcentration: 1,
    category: "Active",
    casNumber: "68-26-8",
    notes: "Restricted to 1% in leave-on cosmetics. Not for use in lip products or products for children. Requires SPF recommendation.",
    reference: "COFEPRIS Circular 2018-R"
  },
  {
    name: "Retinyl Palmitate",
    status: "restricted",
    maxConcentration: 2,
    category: "Active",
    casNumber: "79-81-2",
    notes: "Maximum 2% in face products. Not recommended for sun-exposed skin without SPF.",
    reference: "COFEPRIS Circular 2018-R"
  },
  {
    name: "Vitamin C (Ascorbic Acid)",
    status: "allowed",
    maxConcentration: 20,
    category: "Active",
    casNumber: "50-81-7",
    notes: "Permitted up to 20% in leave-on products. pH should be maintained above 2.5.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Kojic Acid",
    status: "restricted",
    maxConcentration: 1,
    category: "Active",
    casNumber: "501-30-4",
    notes: "Restricted to 1% maximum. Must include sensitization warning. Not for products intended for children.",
    reference: "COFEPRIS Acuerdo 2016"
  },
  {
    name: "Azelaic Acid",
    status: "allowed",
    maxConcentration: 20,
    category: "Active",
    casNumber: "123-99-9",
    notes: "Permitted up to 20% in cosmetic products. Higher concentrations classified as pharmaceutical.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Glycerin",
    status: "allowed",
    maxConcentration: null,
    category: "Humectant",
    casNumber: "56-81-5",
    notes: "No concentration restrictions. Generally recognized as safe.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Sodium Hyaluronate",
    status: "allowed",
    maxConcentration: 2,
    category: "Active",
    casNumber: "9067-32-7",
    notes: "Permitted up to 2% in cosmetic formulations.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Panthenol",
    status: "allowed",
    maxConcentration: 10,
    category: "Active",
    casNumber: "81-13-0",
    notes: "Permitted up to 10% in cosmetic products. No restrictions.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Allantoin",
    status: "allowed",
    maxConcentration: 2,
    category: "Active",
    casNumber: "97-59-6",
    notes: "Permitted up to 2% in cosmetic products.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Tocopherol",
    status: "allowed",
    maxConcentration: 5,
    category: "Active",
    casNumber: "59-02-9",
    notes: "Vitamin E. Permitted up to 5% in cosmetic products.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Cetearyl Alcohol",
    status: "allowed",
    maxConcentration: null,
    category: "Emollient",
    casNumber: "67762-27-0",
    notes: "No concentration restrictions in cosmetics.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Stearic Acid",
    status: "allowed",
    maxConcentration: null,
    category: "Emollient",
    casNumber: "57-11-4",
    notes: "No concentration restrictions.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Dimethicone",
    status: "allowed",
    maxConcentration: null,
    category: "Emollient",
    casNumber: "9006-65-9",
    notes: "No concentration restrictions in cosmetics.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Cyclopentasiloxane",
    status: "restricted",
    maxConcentration: 50,
    category: "Emollient",
    casNumber: "541-02-6",
    notes: "Under review. Some jurisdictions restricting to rinse-off only. Currently allowed up to 50% in Mexico.",
    reference: "COFEPRIS Circular 2020"
  },
  {
    name: "Lactic Acid",
    status: "allowed",
    maxConcentration: 10,
    category: "Active",
    casNumber: "50-21-5",
    notes: "Maximum 10% in consumer products. pH not below 3.5.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Mandelic Acid",
    status: "allowed",
    maxConcentration: 10,
    category: "Active",
    casNumber: "90-64-2",
    notes: "Maximum 10% in consumer products.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Citric Acid",
    status: "allowed",
    maxConcentration: null,
    category: "Active",
    casNumber: "77-92-9",
    notes: "No concentration restrictions when used as pH adjuster.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Arbutin",
    status: "allowed",
    maxConcentration: 7,
    category: "Active",
    casNumber: "497-76-7",
    notes: "Beta-arbutin allowed up to 7%. Do not confuse with hydroquinone derivatives.",
    reference: "COFEPRIS Acuerdo 2017"
  },
  {
    name: "Alpha-Arbutin",
    status: "allowed",
    maxConcentration: 2,
    category: "Active",
    casNumber: "84380-01-8",
    notes: "Permitted up to 2% in cosmetic formulations.",
    reference: "COFEPRIS Acuerdo 2017"
  },
  {
    name: "Tranexamic Acid",
    status: "allowed",
    maxConcentration: 3,
    category: "Active",
    casNumber: "1197-18-8",
    notes: "Permitted up to 3% in cosmetic products for skin brightening.",
    reference: "COFEPRIS Acuerdo 2019"
  },
  {
    name: "Ferulic Acid",
    status: "allowed",
    maxConcentration: 5,
    category: "Active",
    casNumber: "1135-24-6",
    notes: "Permitted up to 5% in cosmetic products.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Resveratrol",
    status: "allowed",
    maxConcentration: 2,
    category: "Active",
    casNumber: "501-36-0",
    notes: "Permitted up to 2% in cosmetic products.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Bakuchiol",
    status: "allowed",
    maxConcentration: 2,
    category: "Active",
    casNumber: "10309-37-2",
    notes: "Retinol alternative. Permitted up to 2% in cosmetics.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Centella Asiatica",
    status: "allowed",
    maxConcentration: null,
    category: "Active",
    casNumber: "N/A",
    notes: "No concentration restrictions as botanical extract.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Tea Tree Oil",
    status: "allowed",
    maxConcentration: 5,
    category: "Active",
    casNumber: "68647-73-4",
    notes: "Maximum 5% in leave-on products. Must list potential allergens.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Witch Hazel",
    status: "allowed",
    maxConcentration: null,
    category: "Active",
    casNumber: "68916-39-2",
    notes: "No concentration restrictions.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Aloe Vera",
    status: "allowed",
    maxConcentration: null,
    category: "Active",
    casNumber: "85507-69-3",
    notes: "No concentration restrictions.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Chamomile Extract",
    status: "allowed",
    maxConcentration: null,
    category: "Active",
    casNumber: "84649-86-5",
    notes: "No concentration restrictions. May cause allergic reactions in sensitive individuals.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Green Tea Extract",
    status: "allowed",
    maxConcentration: null,
    category: "Active",
    casNumber: "84650-60-2",
    notes: "No concentration restrictions.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },

  // ==========================================
  // PRESERVATIVES (Restricted)
  // ==========================================
  {
    name: "Phenoxyethanol",
    status: "restricted",
    maxConcentration: 1,
    category: "Preservative",
    casNumber: "122-99-6",
    notes: "Maximum 1% in finished cosmetic products. One of the most common preservatives.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex V"
  },
  {
    name: "Methylparaben",
    status: "restricted",
    maxConcentration: 0.4,
    category: "Preservative",
    casNumber: "99-76-3",
    notes: "Maximum 0.4% individually or 0.8% total parabens combined. Under ongoing safety review.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex V"
  },
  {
    name: "Propylparaben",
    status: "restricted",
    maxConcentration: 0.14,
    category: "Preservative",
    casNumber: "94-13-3",
    notes: "Maximum 0.14% individually. Not to be used in leave-on products for children under 3 in the diaper area.",
    reference: "COFEPRIS Circular 2019-P"
  },
  {
    name: "Benzalkonium Chloride",
    status: "restricted",
    maxConcentration: 0.1,
    category: "Preservative",
    casNumber: "8001-54-5",
    notes: "Maximum 0.1% in cosmetics. Higher concentrations classified as antiseptic/pharmaceutical.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex V"
  },
  {
    name: "Chlorhexidine",
    status: "restricted",
    maxConcentration: 0.3,
    category: "Preservative",
    casNumber: "55-56-1",
    notes: "Maximum 0.3% in cosmetics.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex V"
  },
  {
    name: "BHA (Butylated Hydroxyanisole)",
    status: "restricted",
    maxConcentration: 0.5,
    category: "Preservative",
    casNumber: "25013-16-5",
    notes: "Maximum 0.5% as antioxidant. Classified as possible carcinogen — under review.",
    reference: "COFEPRIS Acuerdo 2020"
  },
  {
    name: "BHT",
    status: "allowed",
    maxConcentration: 0.5,
    category: "Preservative",
    casNumber: "128-37-0",
    notes: "Maximum 0.5% as antioxidant in cosmetics.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },

  // ==========================================
  // UV FILTERS (Restricted)
  // ==========================================
  {
    name: "Titanium Dioxide",
    status: "restricted",
    maxConcentration: 25,
    category: "UV Filter",
    casNumber: "13463-67-7",
    notes: "Maximum 25% in sunscreen products. Not to be used in spray products that could be inhaled.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex VII"
  },
  {
    name: "Zinc Oxide",
    status: "restricted",
    maxConcentration: 25,
    category: "UV Filter",
    casNumber: "1314-13-2",
    notes: "Maximum 25% in sunscreen products. Nano-form restrictions may apply.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex VII"
  },
  {
    name: "Octinoxate",
    status: "restricted",
    maxConcentration: 7.5,
    category: "UV Filter",
    casNumber: "5466-77-3",
    notes: "Maximum 7.5%. Under environmental review due to coral reef concerns.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex VII"
  },
  {
    name: "Oxybenzone",
    status: "restricted",
    maxConcentration: 6,
    category: "UV Filter",
    casNumber: "131-57-7",
    notes: "Maximum 6%. Endocrine disruptor concerns. Banned in some coastal regions.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex VII"
  },
  {
    name: "Avobenzone",
    status: "restricted",
    maxConcentration: 3,
    category: "UV Filter",
    casNumber: "70356-09-1",
    notes: "Maximum 3%. Must be stabilized with other UV filters.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex VII"
  },

  // ==========================================
  // SURFACTANTS
  // ==========================================
  {
    name: "Sodium Lauryl Sulfate",
    status: "restricted",
    maxConcentration: 2,
    category: "Surfactant",
    casNumber: "151-21-3",
    notes: "Maximum 2% in leave-on products. No restriction in rinse-off products. Known skin irritant.",
    reference: "COFEPRIS Circular 2017"
  },
  {
    name: "Sodium Laureth Sulfate",
    status: "allowed",
    maxConcentration: null,
    category: "Surfactant",
    casNumber: "9004-82-4",
    notes: "No specific concentration restriction. Milder than SLS.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },
  {
    name: "Cocamidopropyl Betaine",
    status: "allowed",
    maxConcentration: null,
    category: "Surfactant",
    casNumber: "61789-40-0",
    notes: "No concentration restrictions. Generally well-tolerated.",
    reference: "NOM-141-SSA1/SCFI-2012"
  },

  // ==========================================
  // BANNED INGREDIENTS
  // ==========================================
  {
    name: "Hydroquinone",
    status: "banned",
    maxConcentration: 0,
    category: "Active",
    casNumber: "123-31-9",
    notes: "BANNED in cosmetics. Only permitted in pharmaceutical products with prescription (max 4%). Linked to ochronosis and potential carcinogenicity.",
    reference: "COFEPRIS Acuerdo 2019-BAN, NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Mercury",
    status: "banned",
    maxConcentration: 0,
    category: "Active",
    casNumber: "7439-97-6",
    notes: "BANNED. Toxic heavy metal. No cosmetic use permitted. Traces above 1ppm trigger recall.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Lead Acetate",
    status: "banned",
    maxConcentration: 0,
    category: "Colorant",
    casNumber: "301-04-2",
    notes: "BANNED. Previously used in progressive hair dyes. Neurotoxic compound.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Formaldehyde",
    status: "banned",
    maxConcentration: 0,
    category: "Preservative",
    casNumber: "50-00-0",
    notes: "BANNED as intentional ingredient. Classified carcinogen. Trace limits of 0.05% apply for formaldehyde-releasing preservatives.",
    reference: "COFEPRIS Acuerdo 2018-BAN"
  },
  {
    name: "Triclosan",
    status: "banned",
    maxConcentration: 0,
    category: "Preservative",
    casNumber: "3380-34-5",
    notes: "BANNED in leave-on cosmetics as of 2020. Endocrine disruptor. Limited exception for specific rinse-off products at 0.3%.",
    reference: "COFEPRIS Acuerdo 2020-BAN"
  },
  {
    name: "Toluene",
    status: "banned",
    maxConcentration: 0,
    category: "Other",
    casNumber: "108-88-3",
    notes: "BANNED in nail products. Reproductive toxicant. Previously common in nail polish.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Coal Tar",
    status: "banned",
    maxConcentration: 0,
    category: "Colorant",
    casNumber: "8007-45-2",
    notes: "BANNED in cosmetics. Known carcinogen. Only permitted in pharmaceutical anti-dandruff products.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Diethylhexyl Phthalate",
    status: "banned",
    maxConcentration: 0,
    category: "Other",
    casNumber: "117-81-7",
    notes: "BANNED. Endocrine disruptor. DEHP prohibited in all cosmetic products.",
    reference: "COFEPRIS Acuerdo 2017-BAN"
  },
  {
    name: "Bithionol",
    status: "banned",
    maxConcentration: 0,
    category: "Preservative",
    casNumber: "97-18-7",
    notes: "BANNED. Can cause photocontact sensitization.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Chloroform",
    status: "banned",
    maxConcentration: 0,
    category: "Other",
    casNumber: "67-66-3",
    notes: "BANNED. Toxic solvent. Classified carcinogen.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Methylene Chloride",
    status: "banned",
    maxConcentration: 0,
    category: "Other",
    casNumber: "75-09-2",
    notes: "BANNED. Toxic solvent. Previously used in aerosol products.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Vinyl Chloride",
    status: "banned",
    maxConcentration: 0,
    category: "Other",
    casNumber: "75-01-4",
    notes: "BANNED. Known carcinogen. Previously used as aerosol propellant.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Zirconium",
    status: "banned",
    maxConcentration: 0,
    category: "Other",
    casNumber: "7440-67-7",
    notes: "BANNED in aerosol products. Can cause granulomas.",
    reference: "NOM-141-SSA1/SCFI-2012 Annex II"
  },
  {
    name: "Butylparaben",
    status: "banned",
    maxConcentration: 0,
    category: "Preservative",
    casNumber: "94-26-8",
    notes: "BANNED. Endocrine disruption concerns. Removed from permitted preservative list.",
    reference: "COFEPRIS Acuerdo 2020-BAN"
  },
  {
    name: "Isobutyl Paraben",
    status: "banned",
    maxConcentration: 0,
    category: "Preservative",
    casNumber: "4247-02-3",
    notes: "BANNED. Estrogenic activity concerns.",
    reference: "COFEPRIS Acuerdo 2020-BAN"
  },
  {
    name: "Isopropyl Paraben",
    status: "banned",
    maxConcentration: 0,
    category: "Preservative",
    casNumber: "4191-73-5",
    notes: "BANNED. Insufficient safety data for cosmetic use.",
    reference: "COFEPRIS Acuerdo 2020-BAN"
  },
  {
    name: "Benzoyl Peroxide",
    status: "restricted",
    maxConcentration: 5,
    category: "Active",
    casNumber: "94-36-0",
    notes: "Maximum 5% in cosmetic products. Higher concentrations classified as pharmaceutical.",
    reference: "COFEPRIS Circular 2016"
  },
  {
    name: "Hydrogen Peroxide",
    status: "restricted",
    maxConcentration: 12,
    category: "Active",
    casNumber: "7722-84-1",
    notes: "Maximum 12% in hair products, 0.1% in skin products, 6% in oral/tooth products.",
    reference: "NOM-141-SSA1/SCFI-2012, Annex III"
  },
];

module.exports = cofeprisDatabase;
