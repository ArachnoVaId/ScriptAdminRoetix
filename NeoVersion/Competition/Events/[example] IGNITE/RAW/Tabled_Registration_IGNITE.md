# RAW — IGNITE Registration (WPC)

## Section 1: Team Data

> **Notes:**
> - If applying for PDEC, the team name has to differ from the product's name.
> - The team name is only allowed to consist of latin letters and numbers, and does not contain symbols.
> - Team name must not be offensive to any ethnicity, religion, race, and/or intergroup relations. Disobeyment to this rule will result in immediate disqualification.

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | TeamName | Team name | text | true | |
| 2 | NationOfOrigin | Nation of origin | text | true | |
| 3 | UniversityName | University name | text | true | |

### Team Leader

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | LeaderFullName | Full name | text | true | | |
| 2 | LeaderSex | Sex | multiple_choice | true | | Male, Female |
| 3 | LeaderMajor | Major | text | true | | |
| 4 | LeaderBatch | Batch | text | true | Desc: Enrollment year. Example: 2023 | |
| 5 | LeaderPhoneNumber | Active phone number | phone | true | Desc: Include country code. Example (Indonesia): +62xxxxxxxxxxx | |
| 6 | LeaderEmail | Email | email | true | | |
| 7 | LeaderTwibbonLink | Twibbon link | link | true | | |

## Section 2: First Member

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | Member1FullName | Full name | text | true | | |
| 2 | Member1Sex | Sex | multiple_choice | true | | Male, Female |
| 3 | Member1Major | Major | text | true | | |
| 4 | Member1Batch | Batch | text | true | Desc: Enrollment year. Example: 2023 | |
| 5 | Member1PhoneNumber | Active phone number | phone | true | Desc: Include country code. | |
| 6 | Member1Email | Email | email | true | | |
| 7 | Member1TwibbonLink | Twibbon link | link | true | | |

## Section 3: Second Member

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | Member2FullName | Full name | text | true | | |
| 2 | Member2Sex | Sex | multiple_choice | true | | Male, Female |
| 3 | Member2Major | Major | text | true | | |
| 4 | Member2Batch | Batch | text | true | Desc: Enrollment year. Example: 2023 | |
| 5 | Member2PhoneNumber | Active phone number | phone | true | Desc: Include country code. | |
| 6 | Member2Email | Email | email | true | | |
| 7 | Member2TwibbonLink | Twibbon link | link | true | | |

## Section 4: Attachments & Other

### Attachments

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | StudentIDCard | Student ID card | file | true | Desc: Scan each member's ID card, compile into single file |
| 2 | PosterRepost | Poster repost | file | true | Desc: Screenshot each member's repost, compile into single file |
| 3 | Twibbon | Twibbon | file | true | Desc: Screenshot each member's twibbon, compile into single file |
| 4 | StatementOfOriginality | Statement of Originality | file | true | Desc: Attach filled statement from template |

### Additional Info

| # | Key | Label | Type | Required | Options |
|---|-----|-------|------|----------|---------|
| 1 | InfoIGNITEFrom | How did you know about IGNITE? | multiple_choice | true | Social media, Campus announcement, Friends/word of mouth, Lecturer/faculty recommendation, Others |

### Agreement

| # | Key | Label | Type | Required | Options |
|---|-----|-------|------|----------|---------|
| 1 | AgreementRules | Agrees to comply with the rules and guidelines of IGNITE 2026. | multiple_choice | true | Yes |
| 2 | AgreementAccurate | Confirms that all the information you provided is accurate. | multiple_choice | true | Yes |
| 3 | AgreementResponsibility | Accepts full responsibility, including receiving consequences if information provided is untrue. | multiple_choice | true | Yes |

### Payment

| # | Key | Label | Type | Required |
|---|-----|-------|------|----------|
| 1 | PaymentProof | Payment proof | file | true |
