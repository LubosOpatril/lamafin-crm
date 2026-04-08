exports.handler = async (event) => {
  const accessToken = event.queryStringParameters?.access_token;

  if (!accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Chybí access_token" }),
    };
  }

  const label = process.env.GMAIL_LABEL || "Leady";

  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=label:${encodeURIComponent(label)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
