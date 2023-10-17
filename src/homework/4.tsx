import React, { createContext, useMemo, useState, useContext } from 'react';
import noop from 'lodash/noop';
import { type } from 'os';

type MenuIds = 'first' | 'second' | 'last';
type Menu = { id: MenuIds; title: string };

type SelectedMenu = {
  id: MenuIds;
};
type MenuSelected = { selectedMenu: SelectedMenu };

const MenuSelectedContext = createContext<MenuSelected | undefined>(undefined);

// Додайте тип MenuActionç
type MenuAction = {
  onSelectedMenu: (menu: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  // Додати тип для children
  children: React.ReactNode;
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    id: 'first',
  });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  // Додайте вірний тип для меню
  menus: Menu[];
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext) as MenuSelected;

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{' '}
          {selectedMenu.id === menu.id ? 'Selected' : 'Not selected'}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: 'first',
      title: 'first',
    },
    {
      id: 'second',
      title: 'second',
    },
    {
      id: 'last',
      title: 'last',
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
