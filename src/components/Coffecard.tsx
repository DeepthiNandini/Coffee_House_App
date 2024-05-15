import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Customicon from './Customicon';
import BGicon from './BGicon';

const Card_Width = Dimensions.get('window').width * 0.32;

interface CoffecardProps {
  id: string;
  index: number;
  type: string;
  rosted: string;
  imagelink_square: ImageProps;
  special_ing: string;
  name: string;
  avg_rate: string;
  price: any;
  buttonhandler: any;
}

const Coffecard: React.FC<CoffecardProps> = ({
  id,
  index,
  type,
  rosted,
  imagelink_square,
  special_ing,
  avg_rate,
  price,
  name,
  buttonhandler,
}) => {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.CardGradientstyle}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        <ImageBackground
          source={imagelink_square}
          style={styles.CardImgBg}
          resizeMode="cover">
          <View style={styles.CardRating}>
            <Customicon
              name={'star'}
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_16}
            />
            <Text style={styles.CardRatingText}>{avg_rate}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSubtitle}>{special_ing}</Text>
        <View style={styles.Cardrow}>
          <Text style={styles.CardpriceCurrenct}>
            $<Text style={styles.CardPrice}>{price.price}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              buttonhandler({
                id,
                index,
                type,
                rosted,
                imagelink_square,
                name,
                special_ing,
                prices: [{...price, quantity: 1}],
              });
            }}>
            <BGicon
              color={COLORS.primaryWhiteHex}
              name={'add'}
              size={FONTSIZE.size_10}
              BGColor={COLORS.primaryOrangeHex}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CardGradientstyle: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardImgBg: {
    width: Card_Width,
    height: Card_Width,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRating: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
    position: 'absolute',
    borderBottomLeftRadius: SPACING.space_20,
    borderTopRightRadius: SPACING.space_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    lineHeight: 22,
  },
  Cardrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardpriceCurrenct: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
});
export default Coffecard;
