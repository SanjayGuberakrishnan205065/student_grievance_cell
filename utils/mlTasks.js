const sentimentAnalysis = async (data) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
    {
      headers: {
        Authorization: process.env.HUGGING_FACE_API,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
};

module.exports = {
  sentimentAnalysis,
};
