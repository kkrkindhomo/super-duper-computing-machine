# Contact-backend (Horny Housewives)

Kleine Node.js + Express backend die het contactformulier op
`hornyhousewives.eu` afhandelt en een e-mail verstuurt naar
`lisa@hornyhousewives.eu` via de lokale SMTP-server (Postfix) op dezelfde
machine.

## Endpoints
- `POST /api/contact` — body: `{ "naam": "string", "email": "string", "bericht": "string" }`
  - `email` is verplicht en wordt gevalideerd.
  - `bericht` is verplicht (minimaal 10 tekens, max 2000).
  - `naam` is optioneel.
  - Reactie: `{ "success": true }` of `{ "success": false, "error": "..." }`.
- `GET /api/health` — statuscheck.

## Lokaal starten
```bash
cd backend
cp .env.example .env   # pas de waarden aan
npm install
npm run dev            # of: npm start
```

Testen:
```bash
curl -i -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"naam":"Jonas","email":"jonas@voorbeeld.eu","bericht":"Ik heb een vraag over een verzoek."}'
```

## Config (via `.env`)
| Variabele      | Standaard                    | Omschrijving                                  |
| -------------- | ---------------------------- | --------------------------------------------- |
| `PORT`         | `3000`                       | Poort waarop de server luistert               |
| `CORS_ORIGIN`  | `https://hornyhousewives.eu` | Komma-gescheiden toegestane oorsprongen       |
| `SMTP_HOST`    | `127.0.0.1`                  | SMTP-server (Postfix)                         |
| `SMTP_PORT`    | `25`                         | SMTP-poort                                    |
| `SMTP_SECURE`  | `false`                      | `true` voor TLS op poort 465                  |
| `SMTP_USER`    | *(leeg)*                     | Alleen bij smarthost/relay met inlog          |
| `SMTP_PASS`    | *(leeg)*                     | Alleen bij smarthost/relay met inlog          |
| `DOMAIN`       | `hornyhousewives.eu`         | Domein voor from/recipient                    |
| `FROM_ADDRESS` | `no-reply@hornyhousewives.eu`| Afzenderadres                                 |
| `RECIPIENT`    | `lisa@hornyhousewives.eu`    | Ontvangeradres                                |

## Deploy op Proxmox (Dell R630)
1. **LXC-container** (Debian 12) aanmaken, Node.js 20+ installeren.
2. Deze `backend/` folder kopiëren naar de container, `npm install --production`.
3. `.env` aanmaken (zie `.env.example`).
4. **Postfix** installeren/configureren als verzenden-only:
   - `myhostname = hornyhousewives.eu`
   - `mydestination = localhost`
   - `relayhost =` (leeg = direct versturen)
   - Test: `mail -s test lisa@hornyhousewives.eu < /dev/null`
5. **DNS** instellen voor het domein:
   - SPF: `v=spf1 mx -all`
   - DKIM: tekensleutel (bijv. via `opendkim`)
   - DMARC: `v=DMARC1; p=none; rua=mailto:lisa@hornyhousewives.eu`
   - PTR (rDNS) voor de publieke IP via de ISP.
6. **Cloudflare Tunnel**:
   - `cloudflared` installeren in de container.
   - Tunnel registreren en route `api.hornyhousewives.eu` → `localhost:3000`.
7. **Service** (systemd) zodat de backend na herstart automatisch opstart.

> ⚠️ Veel ISPs blokkeren uitgaande **port 25**. Als e-mails niet aankomen,
> zet dan een smarthost/relay in via `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`
> (bijv. `SMTP_SECURE=true`, `SMTP_PORT=465`). De code hoeft niet te wijzigen.

## Beveiliging
- Rate limiting (5 verzoeken / 15 min / IP).
- Body-limiet (10 kb) en input-trim/lengte-limiet.
- Alleen `POST` en alleen de frontend-oorsprong via CORS.
- Geen geheimen in code — alles via `.env`.
