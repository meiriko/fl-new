import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from '@storybook/test';
import { FLLinkStory } from "./FLLink";

const meta = {
  title: "FL/Routing/Components/FLLink",
  component: FLLinkStory,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  //   color: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    parts: ["item", "tab", "segment"],
    optionsCount: 3,
  },
} satisfies Meta<typeof FLLinkStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Info: Story = {
  name: "Tab link",
  args: {
    parts: ["x", "yy", "zzz"],
  },
};
