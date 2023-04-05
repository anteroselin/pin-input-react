import { render, fireEvent, screen } from "@testing-library/react";
import PinInput from "./PinInput";

describe("PinInput", () => {
  const onPinComplete = jest.fn();

  it("renders input boxes correctly", () => {
    render(<PinInput length={4} onPinComplete={onPinComplete} />);
    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes.length).toEqual(4);
    expect(inputBoxes[0]).toHaveAttribute("maxlength", "1");
    expect(inputBoxes[0]).toHaveAttribute("value", "");
  });

  it("fills in default values correctly", () => {
    const defaultValue = "1234";
    render(
      <PinInput
        length={4}
        defaultValue={defaultValue}
        onPinComplete={onPinComplete}
      />
    );
    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes[0]).toHaveValue("1");
    expect(inputBoxes[1]).toHaveValue("2");
    expect(inputBoxes[2]).toHaveValue("3");
    expect(inputBoxes[3]).toHaveValue("4");
  });

  it("calls onPinComplete when all inputs are filled in correctly", () => {
    const defaultValue = "1234";
    const onPinComplete = jest.fn();
    render(
      <PinInput
        length={4}
        defaultValue={defaultValue}
        onPinComplete={onPinComplete}
      />
    );
    const inputBoxes = screen.getAllByRole("textbox");

    fireEvent.change(inputBoxes[0], { target: { value: "1" } });
    fireEvent.change(inputBoxes[1], { target: { value: "2" } });
    fireEvent.change(inputBoxes[2], { target: { value: "3" } });
    fireEvent.change(inputBoxes[3], { target: { value: "4" } });

    expect(onPinComplete).toHaveBeenCalledWith("1234");
  });

  it("prevents input of non-digit characters", () => {
    render(<PinInput length={1} onPinComplete={onPinComplete} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "a" } });

    expect(input.value).toEqual("");

    fireEvent.change(input, { target: { value: "1" } });

    expect(input.value).toEqual("1");
  });

  it("deletes previous input when Backspace is pressed", () => {
    render(<PinInput length={4} onPinComplete={() => {}} />);
    const inputBoxes = screen.getAllByRole("textbox");

    fireEvent.change(inputBoxes[1], { target: { value: "1" } });
    expect(inputBoxes[1]).toHaveValue("1");

    fireEvent.keyDown(inputBoxes[1], { key: "Backspace" });
    expect(inputBoxes[0]).toHaveValue("");

    fireEvent.keyDown(inputBoxes[0], { key: "Backspace" });
    expect(inputBoxes[0]).toHaveFocus();
  });

  it("moves focus to previous input when Backspace is pressed on first empty input", () => {
    const defaultValue = "1234";
    render(
      <PinInput
        length={4}
        defaultValue={defaultValue}
        onPinComplete={onPinComplete}
      />
    );

    const inputBoxes = screen.getAllByRole("textbox");

    fireEvent.keyDown(inputBoxes[3], { key: "Backspace" });

    expect(inputBoxes[3]).toHaveAttribute("value", "");
    expect(inputBoxes[3]).toHaveFocus();

    fireEvent.keyDown(inputBoxes[2], { key: "Backspace" });

    expect(inputBoxes[2]).toHaveAttribute("value", "");
    expect(inputBoxes[2]).toHaveFocus();
  });

  it("deletes current input when Delete is pressed", () => {
    render(
      <PinInput length={4} defaultValue="1234" onPinComplete={onPinComplete} />
    );
    const inputBoxes = screen.getAllByRole("textbox");
    const secondInput = inputBoxes[1] as HTMLInputElement;
    fireEvent.keyDown(secondInput, { key: "Delete" });
    expect(secondInput.value).toBe("");
  });
});
