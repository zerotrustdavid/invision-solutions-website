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
  title: string;
  situation: string;
  action: string;
  outcome: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Enterprise Retail",
    title: "Platform Security Uplift",
    situation:
      "A large retail organisation needed its platform security posture reviewed ahead of an audit cycle, across a multi-team engineering environment.",
    action:
      "Gap analysis against current architecture, prioritised remediation roadmap, and hands-on implementation support for the highest-risk findings.",
    outcome: "[METRIC — e.g. reduction in open critical findings, time-to-audit-readiness]",
  },
  {
    tag: "SaaS Scale-up",
    title: "Zero Trust Migration",
    situation:
      "A growing SaaS business had outgrown its perimeter-based access model as headcount and third-party integrations scaled.",
    action:
      "Phased migration to a Zero Trust architecture using Microsoft Entra ID, with CI/CD pipeline hardening run in parallel.",
    outcome: "[METRIC — e.g. reduction in standing access, deployment security incidents]",
  },
  {
    tag: "Financial Services",
    title: "Compliance Sprint",
    situation:
      "A financial services client needed ISO 27001 readiness within a fixed window ahead of a client-mandated deadline.",
    action:
      "Gap assessment, control implementation, and audit-ready documentation, run as a fixed-scope sprint.",
    outcome: "[METRIC — e.g. certification achieved within X weeks]",
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
