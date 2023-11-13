import { render, screen } from "@testing-library/react";

import Form from "./form";
import { describe, test } from "vitest";

describe("Check Form renders", () => {
  test("Form renders with an upload button", () => {
    render(<Form />);
    const uploadButton = screen.getByText(/upload images/i);
    expect(uploadButton).toBeInTheDocument();
  });
});
