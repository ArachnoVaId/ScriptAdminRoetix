# Voucher Competition Script Guide

## What This Script Does

Bulk creates **referral codes** for competition-type events on the Roetix platform via the Competition API.

## API Endpoint

```
POST https://competition.roetix.com/api/v1/events/:eventSlug/referrals
```

## Authentication

Uses Bearer token from `localStorage.getItem('competitionAdminToken')`.
Must be logged in at `https://admin.roetix.com` first.

## How To Use

1. Login at https://admin.roetix.com
2. Navigate to `https://admin.roetix.com/events/:slug/referrals`
3. Open DevTools Console (F12)
4. Paste the script and press Enter

## Information Needed From User

When asked to create referral codes, provide:

| Field | Description | Example |
|---|---|---|
| **Event Slug** | The slug in the URL `/events/:slug/referrals` | `MEGMBCC20Team` |
| **Codes** | List of referral code names | `MEDPAR017`, `MEDPAR018` |
| **Discount Type** | `flat` (IDR) or `percentage` (%) | `flat` |
| **Discount Value** | The discount amount (number, no formatting) | `15000` for Rp15,000 |
| **Quota** | Max number of uses per code | `2` |
| **Name** | Optional. If not provided, name = code | `MEDPAR017` |

## Payload Structure

```json
{
  "referralName": "MEDPAR017",
  "referralCode": "MEDPAR017",
  "discountType": "flat",
  "discountValue": 15000,
  "quota": 2
}
```

### Payload Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `referralName` | string | yes | Display name (usually same as code) |
| `referralCode` | string | yes | The actual code users enter |
| `discountType` | `"flat"` or `"percentage"` | yes | Flat = IDR, percentage = % |
| `discountValue` | number | yes | Discount amount (15000, not "Rp15,000") |
| `quota` | number | yes | Max total uses for this code |

## Discount Value Conversion

When user provides formatted prices, convert to plain numbers:

| User Input | Script Value |
|---|---|
| Rp15,000 | 15000 |
| Rp10.000 | 10000 |
| 15% | 15 |
| Rp100,000 | 100000 |

## Template Script

See `GMBCCTeamVoucher.js` in this directory.

To generate a new script:
1. Copy the template
2. Set `EVENT_SLUG` to the event slug
3. Fill `REFERRAL_CODES` array with the codes, discount values, and quotas
4. Paste into browser console on any admin.roetix.com page
