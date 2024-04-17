import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  getInternalAccountByAddress,
  getMetaMaskAccountsOrdered,
  getUseBlockie,
} from '../../../selectors';
import {
  clearAccountDetails,
  hideWarning,
  setAccountDetailsAddress,
} from '../../../store/actions';
import {
  AvatarAccount,
  AvatarAccountSize,
  AvatarAccountVariant,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '../../component-library';
import { AccountDetailsDisplay } from './account-details-display';

export const AccountDetails = ({ address }) => {
  const dispatch = useDispatch();
  const t = useI18nContext();
  const trackEvent = useContext(MetaMetricsContext);
  const useBlockie = useSelector(getUseBlockie);
  const accounts = useSelector(getMetaMaskAccountsOrdered);
  const {
    metadata: { name },
  } = useSelector((state) => getInternalAccountByAddress(state, address));
  const [showHoldToReveal, setShowHoldToReveal] = useState(false);


  const onClose = useCallback(() => {
    dispatch(setAccountDetailsAddress(''));
    dispatch(clearAccountDetails());
    dispatch(hideWarning());
  }, [dispatch]);

  const avatar = (
    <AvatarAccount
      variant={
        useBlockie
          ? AvatarAccountVariant.Blockies
          : AvatarAccountVariant.Jazzicon
      }
      address={address}
      size={AvatarAccountSize.Lg}
      style={{ margin: '0 auto' }}
    />
  );

  return (
    <>
      <Modal
        isOpen={!showHoldToReveal}
        onClose={onClose}
        data-testid="account-details-modal"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader onClose={onClose}>
            {avatar} {}
          </ModalHeader>
          <ModalBody>
            {}
            <AccountDetailsDisplay
              accounts={accounts}
              accountName={name}
              address={address}

            />
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};

AccountDetails.propTypes = {
  /**
   * The address to show account details for
   */
  address: PropTypes.string,
};
