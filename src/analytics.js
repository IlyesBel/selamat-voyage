import posthog from 'posthog-js';

// Public project token: it is meant to ship in the browser. Memory persistence sets no cookie
// and no localStorage, so the site needs no consent banner for this; the trade-off is that a
// visitor who comes back on another day counts as a new one.
posthog.init('phc_yoxFjTGhtYdag4P8GiFKSpkgCMcxKaMnQSbUSVLHmLmv', {
  api_host: 'https://eu.i.posthog.com',
  persistence: 'memory',
  person_profiles: 'identified_only',
  capture_pageview: 'history_change',
});

export const track = (event, properties) => posthog.capture(event, properties);
