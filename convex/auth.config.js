export default {
  providers: [
    {
      domain: "https://content-peccary-380.convex.cloud",
      applicationID: "convex",
    },
    {
      domain: "https://sweeping-bream-70.clerk.accounts.dev",
      applicationID: "clerk",
      jwksUrl: "https://sweeping-bream-70.clerk.accounts.dev/.well-known/jwks.json",
      tokenFormat: "jwt",
      tokenIssuer: "https://sweeping-bream-70.clerk.accounts.dev"
    }
  ],
};
