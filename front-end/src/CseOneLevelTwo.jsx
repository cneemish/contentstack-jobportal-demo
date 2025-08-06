import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contentstack SDK Initialization
import Contentstack from "contentstack";
// Import the JSON RTE serializer
import { jsonToHtml } from "@contentstack/json-rte-serializer";

// IMPORTANT: Replace with your actual Contentstack API Key, Delivery Token, and Environment
const Stack = Contentstack.Stack({
  api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
  delivery_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN,
  environment: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
});

// Define the renderOption for JSON RTE serialization
// This object tells the serializer how to convert different nodes/marks to HTML
const renderOption = {
  // To render Supercharged RTE NodeType content like paragraph, link, table, order list, un-order list and more.
  p: (node, next) => {
    return `<p class='mb-3 text-gray-700 leading-relaxed'>${next(
      node.children
    )}</p>`;
  },
  h1: (node, next) => {
    return `<h1 class='text-2xl font-bold mt-6 mb-4 text-gray-800'>${next(
      node.children
    )}</h1>`;
  },
  h2: (node, next) => {
    return `<h2 class='text-xl font-semibold mt-5 mb-3 text-gray-800'>${next(
      node.children
    )}</h2>`;
  },
  h3: (node, next) => {
    return `<h3 class='text-lg font-semibold mt-4 mb-2 text-gray-800'>${next(
      node.children
    )}</h3>`;
  },
  ul: (node, next) => {
    return `<ul class='list-disc list-inside ml-4 mb-3'>${next(
      node.children
    )}</ul>`;
  },
  ol: (node, next) => {
    return `<ol class='list-decimal list-inside ml-4 mb-3'>${next(
      node.children
    )}</ol>`;
  },
  li: (node, next) => {
    return `<li class='mb-1'>${next(node.children)}</li>`;
  },
  a: (node, next) => {
    return `<a href="${
      node.attrs.href
    }" class='text-blue-600 hover:underline'>${next(node.children)}</a>`;
  },
  // To render Supercharged RTE MarkType content like bold, italic, underline, strikethrough, inlineCode, subscript, and superscript
  bold: (text) => {
    return `<strong>${text}</strong>`;
  },
  italic: (text) => {
    return `<em>${text}</em>`;
  },
  underline: (text) => {
    return `<u>${text}</u>`;
  },
  strikethrough: (text) => {
    return `<s>${text}</s>`;
  },
  inlineCode: (text) => {
    return `<code class='bg-gray-200 p-1 rounded text-sm'>${text}</code>`;
  },

  // To render block-type embedded items (example, adjust based on your actual embedded entry types)
  block: {
    product: (entry, metadata) => {
      // Example for a 'product' embedded entry
      return `
        <div class='border p-4 my-4 rounded-lg bg-blue-50'>
          <h2 class='text-xl font-bold text-blue-800'>${entry.title}</h2>
          ${
            entry.product_image
              ? `<img src=${entry.product_image.url} alt=${entry.product_image.title} class='w-full h-48 object-cover rounded-md mt-2 mb-3'/>`
              : ""
          }
          <p class='text-lg font-semibold text-blue-700'>Price: ${
            entry.price
          }</p>
        </div>
      `;
    },
    // To render the default block embedded item
    $default: (entry, metadata) => {
      return `
        <div class='border p-4 my-4 rounded-lg bg-gray-50'>
          <h3 class='text-lg font-semibold text-gray-800'>${entry.title}</h3>
          <p class='text-gray-600'>${entry.description}</p>
        </div>
      `;
    },
  },
  // To display inline embedded items
  inline: {
    $default: (entry) => {
      return `<span class='bg-yellow-100 px-2 py-1 rounded text-sm'><strong>${entry.title}</strong> - ${entry.description}</span>`;
    },
  },
  // To display embedded items inserted via link
  link: (entry, metadata) => {
    return `<a href="${metadata.attributes.href}" class='text-purple-600 hover:underline'>${metadata.text}</a>`;
  },
  // To display assets
  display: (asset, metadata) => {
    return `<img src=${
      asset.url || metadata.attributes.src || metadata.attributes["asset-link"]
    } alt=${
      metadata.alt || "Asset image"
    } class='max-w-full h-auto rounded-md my-4'/>`;
  },
};

function CseOneLevelTwo() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("Loading Job Title...");
  const [jobDescriptionHtml, setJobDescriptionHtml] = useState(
    "<p>Loading job description...</p>"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        // IMPORTANT: Replace with your actual Content Type UID, Entry UID, and Language Code
        // Based on the provided JSON, 'job_description' is likely the content type UID
        // and 'blt560a84884f678c28' is an example entry UID.
        const result = await Stack.ContentType("job_description") // Your Content Type UID
          .Entry("blt15e7dbc8b4567e35") // Your Entry UID
          .language("en-us") // Your Language Code
          .toJSON()
          .fetch();

        if (result && result.title && result.job_description) {
          setJobTitle(result.title);

          // Convert the JSON RTE content to HTML using the defined renderOption
          const htmlContent = jsonToHtml(result.job_description, renderOption);
          setJobDescriptionHtml(htmlContent);
        } else {
          setError("Job data not found or incomplete.");
        }
      } catch (err) {
        console.error("Error fetching job data from Contentstack:", err);
        setError(
          "Failed to load job description. Please check your API configuration or network."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleApply = () => {
    navigate("/apply");
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger"
        style={{ minHeight: "80vh" }}
      >
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      {" "}
      {/* Added a container for styling */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{jobTitle}</Accordion.Header>
          <Accordion.Body>
            {/* Render the HTML content using dangerouslySetInnerHTML */}
            <div dangerouslySetInnerHTML={{ __html: jobDescriptionHtml }} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-grid gap-2 mt-4">
        {" "}
        {/* Bootstrap utility for button spacing */}
        <Button
          onClick={handleApply}
          variant="primary"
          size="lg"
          style={{ cursor: "pointer" }}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}

export default CseOneLevelTwo;
