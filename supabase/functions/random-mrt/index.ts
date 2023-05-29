// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Function random-mrt has been invoked");
const mrtJsonUrl =
  "https://wmpmdslvsphtipfquszx.supabase.co/storage/v1/object/public/json/mrt.json";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
const regionList = ["CR", "WR", "NR", "ER", "NER", "any"];

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { region } = await req.json();
    if (!regionList.includes(region)) {
      return new Response(JSON.stringify({ error: "Invalid region" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    const mrtJson = await fetch(mrtJsonUrl).then((res) => res.json());
    console.log(mrtJson);
    // filter by region
    const filteredMrtJson =
      region === "any"
        ? mrtJson
        : mrtJson.filter((mrt) => mrt.REGION_C === region);

    const randomNum = Math.floor(Math.random() * filteredMrtJson.length);
    const randomMrt = filteredMrtJson[randomNum];

    const data = {
      message: "Hello from Supabase!",
      randomMrt,
    };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
