export async function createCheckoutSession(args: { planId: string; userId: string }) {
  // TODO: integrate Stripe/Paddle/etc.
  // For now, simulate payment and land on dashboard with plan activated.
  const { planId } = args;
  return `/dashboard?activated=${encodeURIComponent(planId)}`;
}
