import { createContext, ReactElement, useState } from 'react';

type MenuContextType = {
  responsiveMenu: boolean;
  hoverOpenMenu: () => void;
  toggleOpenMenu: () => void;
}

const MenuContextDefaultValues: MenuContextType = {
  responsiveMenu: false,
  hoverOpenMenu: () => {},
  toggleOpenMenu: () => {}
}

interface IMenuContextProps {
  children: ReactElement;
  menuClose: boolean;
  setMenuClose: (value: boolean) => void;
}

export const MenuContext = createContext<MenuContextType>(MenuContextDefaultValues);

export const MenuProvider = (props: IMenuContextProps) => {
  const [responsiveMenu, setResponsiveMenu] = useState(false);

  const toggleOpenMenu = () => {
    setResponsiveMenu(!responsiveMenu);
    props.setMenuClose(!props.menuClose);
  }

  const hoverOpenMenu = () => {
    if(responsiveMenu) {
      setResponsiveMenu(false);
      props.setMenuClose(false);
    }
  }

  return(
    <MenuContext.Provider 
      value={{
        responsiveMenu,
        toggleOpenMenu,
        hoverOpenMenu,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}