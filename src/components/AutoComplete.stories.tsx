import type { Meta, StoryObj } from "@storybook/react";

import { AutoComplete } from "./AutoComplete";

const meta: Meta<typeof AutoComplete> = {
  component: AutoComplete,
};

export default meta;

type Story = StoryObj<typeof AutoComplete>;

const countries = [
  "USA",
  "Canada",
  "Mexico",
  "Brazil",
  "Argentina",
  "Portugal",
  "Poland",
  "Spain",
  "France",
  "Germany",
  "Italy",
  "Russia",
  "China",
  "Japan",
  "Australia",
  "New Zealand",
];

export const Syncronous: Story = {
  args: {
    placeholder: "Type something",
    options: countries,
  },
};

export const Asyncronous10sec: Story = {
  args: {
    placeholder: "Type something",
    options: new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(countries);
      }, 10000);
    }),
  },
};
