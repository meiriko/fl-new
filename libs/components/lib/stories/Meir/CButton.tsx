import { Button } from '@chakra-ui/react';
export interface CButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link' ;
  colorScheme?: 'mint' | 'red' | 'wood' | 'blue' | 'yellow' | "mint" | "green";
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const CButton = ({
  colorScheme = 'mint',
  label,
  ...props
}: CButtonProps) => {
  return (
    <Button
      colorScheme={colorScheme}
      {...props}
      >
      {label}
    </Button>
  );
};
