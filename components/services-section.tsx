const services = [
  {
    title: 'Web applications',
    description:
      'Marketing sites, customer portals, dashboards and full SaaS products. We usually build with Next.js, React, Node.js and TypeScript, and we look after hosting and deployment too.',
    includes: ['Marketing websites', 'SaaS products', 'Admin dashboards', 'API integrations'],
  },
  {
    title: 'ERP & CRM systems',
    description:
      'Internal tools that bring sales, inventory, HR and billing into one place, often with WhatsApp built in. They share a foundation with GPSERP, the product we run ourselves.',
    includes: ['WhatsApp-connected CRM', 'Inventory and orders', 'HR portals', 'Billing and reports'],
  },
  {
    title: 'Event & trade platforms',
    description:
      'Registration, exhibitor management and buyer–seller matching for exhibitions and summits. Built to hold up on the busiest day of the event, not just the quiet ones.',
    includes: ['Visitor registration', 'Exhibitor portals', 'B2B matchmaking', 'Live analytics'],
  },
  {
    title: 'Marketing automation',
    description:
      'WhatsApp campaigns and cold email outreach with AI-assisted personalisation, running on GPSERP and Mail by GPSERP, so you get tools that are already in production.',
    includes: ['WhatsApp campaigns', 'Cold email outreach', 'Personalisation', 'Campaign reporting'],
  },
  {
    title: 'eCommerce & marketplaces',
    description:
      'Online stores and two-sided marketplaces: catalogues, bookings, payments, partner portals and order tracking, designed around how your customers actually buy.',
    includes: ['Online stores', 'Booking platforms', 'Payment gateways', 'Partner portals'],
  },
  {
    title: 'Support & maintenance',
    description:
      'Monitoring, security updates and fixes after launch. You get a direct WhatsApp or Slack channel to the people who built your product, not a ticket queue.',
    includes: ['Uptime monitoring', 'Security updates', 'Performance reviews', 'Priority fixes'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section" style={{ background: 'var(--paper-2)' }}>
      <div className="wrap">
        <div className="section-head">
          <p className="label">Services</p>
          <div>
            <h2 className="h2" style={{ maxWidth: '15em' }}>
              One team from the first sketch to the support call.
            </h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Most projects use several of these. We plan, design, build and look after the product ourselves, so
              nothing gets lost in a handover.
            </p>
          </div>
        </div>

        <div>
          {services.map((service, i) => (
            <div key={service.title} className="service-row">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3" style={{ fontSize: '1.6rem' }}>
                  {service.title}
                </h3>
              </div>
              <p className="body">{service.description}</p>
              <ul className="service-list" aria-label={`${service.title} includes`}>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
