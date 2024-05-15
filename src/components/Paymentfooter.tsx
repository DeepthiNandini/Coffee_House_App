import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentfooterProps {
  price: PriceProps;
  buttonhandler: any;
  buttontitle: string;
}

const Paymentfooter: React.FC<PaymentfooterProps> = ({
  price,
  buttonhandler,
  buttontitle,
}) => {
  return (
    <View style={styles.pricefooter}>
      <View style={styles.pricecontainer}>
        <Text style={styles.pricetitle}>price</Text>
        <Text style={styles.pricetext}>
          {price.currency}
          <Text style={styles.price}>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.paybutton}
        onPress={() => buttonhandler()}>
        <Text style={styles.buttontext}>{buttontitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pricefooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  pricecontainer: {
    alignItems: 'center',
    width: 100,
  },
  pricetitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  pricetext: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  paybutton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttontext: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});

export default Paymentfooter;
