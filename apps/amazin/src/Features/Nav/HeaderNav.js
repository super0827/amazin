import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../Controllers/userActions';
import SearchBox from '../../components/SearchBox';
import {
  adminMenuItems,
  noUserMenuItems,
  sellerMenuItems,
  userMenuItems
} from './menuItemsTemplate';
import DropMenuCurrency from './DropMenuCurrency';
import { MenuItem } from './MenuItem';
import NavDropBtn from './NavDropBtn';
import Logo from '../../img/a.svg';
import './nav.css';

import { savePath, shortName } from '../../utils';
import { SHADOW } from '../../constants';
import { useShadow } from '../../utils/useShadow';

export function _HeaderNav({ currency }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [shadowOf, setShadowOf, setShadowSlow] = useShadow('');

  const _DropMenu = ({ menuItems }) => (
    <ul
      className={`dropdown__menu ${SHADOW.NAV_DD === shadowOf ? 'show' : ''}`}
    >
      {menuItems.map(MenuItem)}
    </ul>
  );

  const DropMenu = React.memo(_DropMenu);

  return (
    <div className="nav-belt row">
      <Link className="phone--off" to="/">
        <div className="nav__brand">
          <img className="logo" src={Logo} alt="logo Amazin" />
          <span className="mobile--off">mazin'</span>
        </div>
      </Link>

      <Link className="nav__locator flex" to="/map" onClick={savePath()}>
        <div className="sprite__locator"></div>
        <div className="tablet--off">
          <div className="nav__line-1">Deliver to your</div>
          <div className="nav__line-2">Location?</div>
        </div>
      </Link>

      <div className="nav__search">
        <SearchBox />
      </div>

      <NavDropBtn
        className="nav__currency mobile--off"
        className2="sprite__wrapper"
        className3={'sprite flag ' + currency}
        onEnterHandle={() => setShadowOf('currency')}
        onLeaveHandle={() => setShadowOf('')}
      >
        <DropMenuCurrency currency={currency} />
      </NavDropBtn>

      {!userInfo && (
        <NavDropBtn
          label="Hello, Sign in^Account^ & Lists"
          className="nav__user"
          onEnterHandle={setShadowSlow(SHADOW.NAV_DD)}
          onLeaveHandle={setShadowSlow()}
        >
          <DropMenu menuItems={noUserMenuItems()} />
        </NavDropBtn>
      )}

      {userInfo && (
        <NavDropBtn
          label={`Hello, ${shortName(userInfo, 7)}^Account^ & Lists`}
          className="nav__user"
          onEnterHandle={setShadowSlow(SHADOW.NAV_DD)}
          onLeaveHandle={setShadowSlow()}
        >
          <DropMenu
            menuItems={userMenuItems(userInfo, () => dispatch(signout()))}
          />
        </NavDropBtn>
      )}

      {userInfo?.isSeller && (
        <NavDropBtn
          label="Seller^Desk"
          className="nav__seller"
          onEnterHandle={setShadowSlow(SHADOW.NAV_DD)}
          onLeaveHandle={setShadowSlow()}
        >
          <DropMenu menuItems={sellerMenuItems(userInfo)} />
        </NavDropBtn>
      )}

      {userInfo?.isAdmin && (
        <NavDropBtn
          label="Admin^Tools"
          className="nav__admin phone--off"
          onEnterHandle={setShadowSlow(SHADOW.NAV_DD)}
          onLeaveHandle={setShadowSlow()}
        >
          <DropMenu menuItems={adminMenuItems()} />
        </NavDropBtn>
      )}

      <NavDropBtn
        label="Return^& Orders"
        className="nav__return tablet--off disabled dark"
      />

      <Link className="nav__cart flex" to="/cart">
        <div>
          <div className="cart__counter">{cartItems.length}</div>
          <div className="sprite__cart"></div>
        </div>
        <div className="pc-low--off">
          <div className="nav__line-1">Shopping-</div>
          <div className="nav__line-2">Basket</div>
        </div>
      </Link>
    </div>
  );
}

const HeaderNav = React.memo(_HeaderNav);
export default HeaderNav;