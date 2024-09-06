import type { Meta, StoryObj } from "@storybook/react";

import { AutoComplete } from "./AutoComplete";
import { countries } from "./mock/countries";

const meta: Meta<typeof AutoComplete> = {
  component: AutoComplete,
};

export default meta;

type Story = StoryObj<typeof AutoComplete>;

export const Syncronous: Story = {
  args: {
    placeholder: "Type a country",
    options: countries,
    onSelectOption: (value: string) => {
      alert(`Selected: ${value}`);
    },
  },
};

export const Asyncronous10sec: Story = {
  args: {
    placeholder: "Refresh the browser and type a country",
    options: new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(countries);
      }, 10000);
    }),
    onSelectOption: (value: string) => {
      alert(`Selected: ${value}`);
    },
  },
};
