import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the PinInput component", () => {
    render(<App />);
    const pinInput = screen.getByRole("textbox");
    expect(pinInput).toBeInTheDocument();
  });

  it("enters the pin code correctly", () => {
    render(<App />);
    const pinInput = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(pinInput, { target: { value: "1234" } });
    fireEvent.submit(pinInput);

    expect(pinInput.value).toBe("1234");
  });

  it("opens the setting modal correctly", () => {
    render(<App />);
    const settingsButton = screen.getByRole("button", { name: "" });

    fireEvent.click(settingsButton);

    const modal = screen.getByText("Settings");
    expect(modal).toBeInTheDocument();
  });
});
