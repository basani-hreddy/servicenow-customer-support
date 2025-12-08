# ServiceNow Customer Support Portal (CSM)

Customer Service Management project demonstrating cases, omni-channel support, knowledge, entitlements, and integration with ITSM/FSM.

## Overview

This app models a real customer support organization running on ServiceNow CSM. It handles customer cases from multiple channels, uses knowledge to deflect tickets, and routes complex issues to ITSM and Field Service.

## Modules & Tables

- Case Management (`sn_customerservice_case`) – track customer issues and requests.
- Accounts & Contacts – B2B and B2C customer data models.
- Knowledge Management – customer-facing articles for self-service.
- Communities – optional peer-to-peer support.
- Entitlements & SLAs – tier-based support levels (Basic, Premium, Enterprise). 

## Key Features

- Omni-channel intake: email-to-case, web forms, chat/Virtual Agent.
- Customer self-service portal with case tracking and knowledge search.
- Skill-based routing and Advanced Work Assignment for agents.
- Playbooks for recurring case types (password reset, refunds, escalations).
- Integration flows to create ITSM incidents and FSM work orders when needed.

## How to Recreate in a PDI

1. Activate CSM plugins and sample data if available.
2. Configure account/contact records and customer tiers.  
3. Build portal pages with case submission and “My Cases” list.  
4. Configure omni-channel (at least email and portal).  
5. Implement flows for escalation to Incident/Work Orders following `/docs/integration-guide.md`.

## Files in this repo

- `/docs/design.md` – data model, case lifecycle, channel flows.  
- `/docs/integration-guide.md` – how CSM connects to ITSM and FSM.  
- `/data/sample_accounts.csv`, `/data/sample_cases.csv` – example data.

This project shows end-to-end customer service capability on ServiceNow, useful for CSM/consultant roles.
