interface startCommercialResponse {
  data: [
    {
      length: number;
      message: string;
      retry_after: number;
    }
  ];
}
interface getExtensionAnalyticsResponse {
  data: [
    {
      extension_id: string;
      URL: string;
      type: string;
      date_range: {
        started_at: string;
        ended_at: string;
      };
    }
  ];
}
export { startCommercialResponse, getExtensionAnalyticsResponse };
