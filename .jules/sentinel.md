## 2025-01-30 - Hardcoded Secrets in Config
**Vulnerability:** Hardcoded RSA private and public keys were found in `config/default.ts`.
**Learning:** Keys were committed directly into the repo, likely for convenience during development, but this exposes them to anyone with repo access. Merge conflicts in the file suggested multiple attempts to change or fix this, leading to a broken state.
**Prevention:** Always use environment variables for secrets. Use `process.env` or a config library that supports environment variable substitution. Add `.env` to `.gitignore` immediately upon project creation.
