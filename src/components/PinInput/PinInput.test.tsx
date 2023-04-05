import { render, fireEvent, screen } from "@testing-library/react";
import PinInput from "./PinInput";

describe("PinInput", () => {
  const onPinComplete = jest.fn();

  it("renders input boxes correctly", () => {
    render(<PinInput length={4} onPinComplete={onPinComplete} />);
    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes.length).toEqual(4);
    expect(inputBoxes[0]).toHaveAttribute("maxlength", "1");
    expect(inputBoxes[0]).not.toHaveAttribute("value", "");
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
    const inputBox1 = screen.getByRole("textbox", { name: "input-1" });
    const inputBox2 = screen.getByRole("textbox", { name: "input-2" });
    const inputBox3 = screen.getByRole("textbox", { name: "input-3" });
    const inputBox4 = screen.getByRole("textbox", { name: "input-4" });

    expect(inputBox1).toHaveValue("1");
    expect(inputBox2).toHaveValue("2");
    expect(inputBox3).toHaveValue("3");
    expect(inputBox4).toHaveValue("4");
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
    const inputBoxes = Array.from(Array(4)).map((_, i) =>
      screen.getByRole("textbox", { name: `Digit ${i + 1}` })
    );

    fireEvent.change(inputBoxes[0], { target: { value: "1" } });
    fireEvent.change(inputBoxes[1], { target: { value: "2" } });
    fireEvent.change(inputBoxes[2], { target: { value: "3" } });
    fireEvent.change(inputBoxes[3], { target: { value: "4" } });

    expect(onPinComplete).toHaveBeenCalledWith("1234");
  });

  it("prevents input of non-digit characters", () => {
    render(<PinInput length={4} onPinComplete={onPinComplete} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "a" } });

    expect(input.value).toEqual("");

    fireEvent.change(input, { target: { value: "1" } });

    expect(input.value).toEqual("1");
  });

  it("deletes previous input when Backspace is pressed", () => {
    render(<PinInput length={4} onPinComplete={() => {}} />);
    const inputs = Array.from({ length: 4 }).map((_, i) =>
      screen.getByRole(`textbox-${i}`)
    );

    fireEvent.change(inputs[1], { target: { value: "1" } });
    expect(inputs[1]).toHaveValue("1");

    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(inputs[0]).toHaveValue("");

    fireEvent.keyDown(inputs[0], { key: "Backspace" });
    expect(inputs[0]).toHaveFocus();
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

    const inputBoxes = Array.from({ length: 4 }, (_, i) =>
      screen.getByRole(`textbox-${i}`)
    );

    fireEvent.keyDown(inputBoxes[0], { key: "Backspace" });

    expect(inputBoxes[3]).toHaveAttribute("value", "");
    expect(inputBoxes[3]).toHaveFocus();
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
