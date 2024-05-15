import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Imagebackgroundinf from '../components/Imagebackgroundifn';
import Paymentfooter from '../components/Paymentfooter';

const Details = ({navigation, route}: any) => {
  const Itemofindex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  const [price, setprice] = useState(Itemofindex.prices[0]);

  const [fullDesc, setfullDesc] = useState(false);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const addToCart = useStore((state: any) => state.addToCart);

  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ing,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ing,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('cart');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewflex}>
        <Imagebackgroundinf
          EnableBackHandler={true}
          imagelink_portrait={Itemofindex.imagelink_portrait}
          type={Itemofindex.type}
          id={Itemofindex.id}
          favourite={Itemofindex.favourite}
          name={Itemofindex.name}
          special_ingredient={Itemofindex.special_ingredient}
          ingredients={Itemofindex.ingredients}
          average_rating={Itemofindex.average_rating}
          ratings_count={Itemofindex.ratings_count}
          roasted={Itemofindex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.Footerinfo}>
          <Text style={styles.infotitle}>description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setfullDesc(prev => !prev);
              }}>
              <Text style={styles.desctext}>{Itemofindex.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setfullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.desctext}>
                {Itemofindex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.infotitle}>size</Text>
          <View style={styles.Sizeoutercontainer}>
            {Itemofindex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setprice(data);
                }}
                style={[
                  styles.sizebox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryLightGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.sizetext,
                    {
                      fontSize:
                        Itemofindex.type == 'bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Paymentfooter
          price={price}
          buttontitle="Add to cart"
          buttonhandler={() => {
            addToCarthandler({
              id: Itemofindex.id,
              index: Itemofindex.index,
              name: Itemofindex.name,
              roasted: Itemofindex.roasted,
              imagelink_square: Itemofindex.imagelink_square,
              special_ing: Itemofindex.special_ing,
              type: Itemofindex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollviewflex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  Footerinfo: {
    padding: SPACING.space_20,
  },
  infotitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  desctext: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
    letterSpacing: 0.5,
  },
  Sizeoutercontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizebox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: SPACING.space_10,
    borderWidth: 2,
  },
  sizetext: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default Details;
