import type { Meta, StoryObj } from "@storybook/react";

import { AutoComplete } from "./AutoComplete";

const meta: Meta<typeof AutoComplete> = {
  component: AutoComplete,
};

export default meta;

type Story = StoryObj<typeof AutoComplete>;

export const Primary: Story = {
  args: {
    placeholder: "Type something",
  },
};
