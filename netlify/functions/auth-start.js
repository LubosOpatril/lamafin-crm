exports.handler = async () => {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;

  if (!client_id || !redirect_uri) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Chybí GOOGLE_CLIENT_ID nebo REDIRECT_URI",
        hasClientId: !!client_id,
        redirectUri: redirect_uri || null
      })
    };
  }

  const params = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    access_type: "offline",
    prompt: "consent"
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    }
  };
};
