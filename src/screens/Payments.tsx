import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Gradientbgicon from '../components/Gradientbgicon';
import Paymentmethod from '../components/Paymentmethod';
import Paymentfooter from '../components/Paymentfooter';
import LinearGradient from 'react-native-linear-gradient';
import Customicon from '../components/Customicon';
import {useStore} from '../store/Store';
import PopupAnimation from '../components/PopupAnimation';

const PaymentList = [
  {
    name: 'wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const Payments = ({navigation, route}: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addtoorderhistory = useStore((state: any) => state.addtoorderhistory);

  const [Paymentmode, setPaymentmode] = useState('creditcard');
  const [showanimation, setshowanimation] = useState(false);
  const buttonbackhandler = () => {
    setshowanimation(true);
    addtoorderhistory();
    calculateCartPrice();
    setTimeout(() => {
      setshowanimation(false);
      navigation.navigate('orderHistory');
    }, 2000);
  };

  return (
    <View style={styles.Screencontainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showanimation ? (
        <PopupAnimation
          style={styles.LottieView}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.Scrollviewflex}>
        <View style={styles.headercontainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Gradientbgicon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.headertext}>Payments</Text>
          <View style={styles.Emptyview} />
        </View>
        <View style={styles.paymentoption}>
          <TouchableOpacity
            onPress={() => {
              setPaymentmode('Credit card');
            }}>
            <View
              style={[
                styles.cardcontainer,
                {
                  borderColor:
                    Paymentmode == 'Credit card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.creditcardtitle}>Credit card</Text>
              <View style={styles.creditbackground}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.linergradient}>
                  <View style={styles.creditcardrow}>
                    <Customicon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Customicon
                      name="visa"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_30 * 2}></Customicon>
                  </View>
                  <View style={styles.creditnumbercont}>
                    <Text style={styles.creditnumb}>5372</Text>
                    <Text style={styles.creditnumb}>8392</Text>
                    <Text style={styles.creditnumb}>8357</Text>
                    <Text style={styles.creditnumb}>3287</Text>
                  </View>
                  <View style={styles.creditcardrow}>
                    <View style={styles.creditnamecont}>
                      <Text style={styles.subtitle}>Card Holder Name</Text>
                      <Text style={styles.title}>Deepthi</Text>
                    </View>
                    <View style={styles.creditdatecont}>
                      <Text style={styles.subtitle}>Expiry Date</Text>
                      <Text style={styles.title}>02/26</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentmode(data.name);
              }}>
              <Paymentmethod
                paymentmode={Paymentmode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Paymentfooter
        buttontitle={`Pay with ${Paymentmode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonhandler={buttonbackhandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Screencontainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieView: {
    flex: 1,
  },
  Scrollviewflex: {
    flexGrow: 1,
  },
  headercontainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headertext: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  Emptyview: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  paymentoption: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  cardcontainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  creditcardtitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  creditbackground: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  linergradient: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  creditcardrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditnumbercont: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  creditnumb: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  creditnamecont: {
    alignItems: 'flex-start',
  },
  creditdatecont: {
    alignItems: 'flex-end',
  },
});
export default Payments;
