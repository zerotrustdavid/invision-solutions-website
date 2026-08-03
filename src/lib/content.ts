export type Service = {
  slug: string;
  title: string;
  summary: string;
};

export const SERVICES: Service[] = [
  {
    slug: "cloud-security-architecture",
    title: "Cloud Security & Architecture",
    summary:
      "Design and harden environments across AWS, Azure, and GCP. Zero Trust architecture, IAM and Microsoft Entra ID configuration, and secure-by-design cloud migrations — built to hold up under audit, not just under a demo.",
  },
  {
    slug: "devsecops-cicd-security",
    title: "DevSecOps & CI/CD Security",
    summary:
      "Security folded into the pipeline itself: Terraform-driven infrastructure-as-code, GitHub Actions security gates, dependency and vulnerability scanning with Snyk, and secrets management done properly — so security stops being the thing that blocks a release.",
  },
  {
    slug: "security-operations-siem",
    title: "Security Operations & SIEM Engineering",
    summary:
      "SIEM design and tuning across Splunk, Datadog, and Microsoft Sentinel, endpoint protection with CrowdStrike Falcon, and detection engineering that's built around your actual threat model — not a vendor's default ruleset.",
  },
  {
    slug: "compliance-governance",
    title: "Compliance & Governance",
    summary:
      "ISO 27001 and SOC 2 readiness, audit preparation, and continuous compliance monitoring with tools like Drata — framed as an engineering problem with a paper trail, not a paperwork problem with a deadline.",
  },
  {
    slug: "fractional-security-leadership",
    title: "Fractional Security Leadership",
    summary:
      "For organisations that need senior security judgement at the table — architecture reviews, board-level risk reporting, vendor evaluation — without the cost or commitment of a full-time CISO hire.",
  },
];

export type CaseStudy = {
  tag: string;
  discipline: string;
  title: string;
  situation: string;
  action: string;
  outcome: string;
};

/**
 * Illustrative case studies drawn from real practice areas. Clients are not
 * named and every numeric claim is a marked placeholder — David supplies real,
 * permitted figures before this page is treated as final.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Enterprise Retail",
    discipline: "DevSecOps",
    title: "Pipeline Security Uplift",
    situation:
      "A large retail organisation was shipping through CI/CD pipelines with no consistent security gate. Vulnerable dependencies and hard-coded secrets were reaching production, and each engineering team applied its own standard.",
    action:
      "Introduced GitHub Actions security gates with Snyk dependency and container scanning, moved secrets into a managed store, and codified the whole standard as reusable workflows so every team inherited it by default rather than by discipline.",
    outcome:
      "[METRIC — e.g. reduction in critical findings reaching production, time-to-remediate]",
  },
  {
    tag: "SaaS Scale-up",
    discipline: "Cloud Migration",
    title: "Secure-by-Design Migration",
    situation:
      "A growing SaaS business needed to move off ageing self-managed infrastructure without carrying its flat network model and long-lived credentials into the new environment.",
    action:
      "Designed the target architecture with segmented networks and short-lived, role-based access from day one. Delivered the landing zone as Terraform modules and ran the migration in phases, each independently reversible.",
    outcome:
      "[METRIC — e.g. reduction in standing privileged access, migration completed within X weeks]",
  },
  {
    tag: "Financial Services",
    discipline: "SOC 2 Type II",
    title: "Audit Readiness Programme",
    situation:
      "A financial services client had committed to SOC 2 Type II for a client-mandated deadline, with controls that were largely informal and evidence gathered by hand.",
    action:
      "Ran a gap assessment against the Trust Services Criteria, implemented the missing technical controls, and automated evidence collection so the observation window produced its own audit trail rather than a year-end scramble.",
    outcome: "[METRIC — e.g. controls satisfied, report achieved within X weeks]",
  },
  {
    tag: "Multi-Cloud",
    discipline: "CSPM",
    title: "Posture Management Rollout",
    situation:
      "Workloads had spread across more than one cloud provider with no single view of misconfiguration. Drift went unnoticed between quarterly reviews, and severity was assessed inconsistently.",
    action:
      "Deployed cloud security posture management across all accounts, tuned the rule set to the organisation's actual risk appetite to cut alert noise, and routed findings into the existing engineering workflow with clear ownership.",
    outcome:
      "[METRIC — e.g. reduction in high-severity misconfigurations, mean time to detect drift]",
  },
  {
    tag: "Regulated Enterprise",
    discipline: "Security Architecture",
    title: "Zero Trust Access Model",
    situation:
      "A perimeter-based access model no longer matched how the organisation worked — contractors, third-party integrations, and remote employees all sat inside a trusted network boundary.",
    action:
      "Designed a Zero Trust access model on Microsoft Entra ID with conditional access, device posture checks, and just-in-time elevation. Sequenced the rollout so no user group lost access during transition.",
    outcome:
      "[METRIC — e.g. reduction in standing access, privileged sessions brought under approval]",
  },
  {
    tag: "Scale-up",
    discipline: "Solution Architecture",
    title: "Security Advisory Retainer",
    situation:
      "An engineering team was making architectural decisions with security consequences and no senior security voice in the room, discovering problems at review rather than at design.",
    action:
      "Embedded as a fractional security architect: design review at proposal stage, threat modelling for new services, and vendor assessments — plus written standards the team could apply without waiting on a review.",
    outcome:
      "[METRIC — e.g. designs reviewed pre-build, reduction in security rework]",
  },
];

export const CERTIFICATIONS_AND_STACK = [
  "AWS Certified Solutions Architect – Professional",
  "Microsoft Azure (AZ-900)",
  "CrowdStrike Falcon",
  "Terraform",
  "GitHub Actions",
  "Snyk",
  "Splunk",
  "Datadog",
];
