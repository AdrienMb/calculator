export type InputColors = 'default' | 'grey' | 'primary' | 'secondary'; 

export type ThemeColors = 'default' | 'dark';

export type Theme = {
  theme: ThemeColors,
  changeTheme:  React.Dispatch<React.SetStateAction<ThemeColors>>,
};
