import HomeScreen from "../screens/HomeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import AboutScreen from "../screens/AboutScreen";
import OpenDrawerButton from "../component/OpenDrawerButton";
import FeederDetail from "../Modal/FeederDetail";
import TabNavigation from "./TabNavigation";
import WalletHome from "../screens/Wallet/WalletHome";
import NotificationStack from "./NotificationStack";
import NotificationDetail from "../Modal/NotificationDetail";
import AddBalance from "../screens/Wallet/AddBalance";
import BalanceAddSuccessfull from "../screens/Wallet/BalanceAddSuccessfull";
import TakviyeTesekkurler from "../screens/Thanks/TakviyeTesekkurler";
import GecmisTakviyeler from "../screens/GecmisTakviyeler/GecmisTakviyeler";
import GecmisTakviyeDetay from "../Modal/GecmisTakviyeDetay";
import ArkadaslariniDavetEt from "../screens/ArkadaslariniDavetEt/ArkadaslariniDavetEt";
import BasariliDavetiye from "../screens/Thanks/BasariliDavetiye";
import SelectLanguageScreen from "../screens/Language/SelectLanguageScreen";
import ProfilUpdate from "../screens/User/ProfilUpdate";

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator initialRouteName="TabGroup" screenOptions={{
        headerShown:false,
        headerTitleAlign:'center',
        /*headerRight:()=>(
            <LogoutButton/>
        )*/
    }}>
        <Stack.Group>
            <Stack.Screen name="TabGroup" component={TabNavigation} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="AboutScreen" component={AboutScreen} />
            <Stack.Screen name="NotificationStack" component={NotificationStack} />
            <Stack.Screen name="WalletHome" component={WalletHome} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="ProfilUpdate" component={ProfilUpdate} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="AddBalance" component={AddBalance} />
            <Stack.Screen name="BalanceAddSuccessfull" component={BalanceAddSuccessfull} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="TakviyeTesekkurler" component={TakviyeTesekkurler} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="GecmisTakviyeler" component={GecmisTakviyeler} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="SelectLanguageScreen" component={SelectLanguageScreen} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="ArkadaslariniDavetEt" component={ArkadaslariniDavetEt} />
            <Stack.Screen name="BasariliDavetiye" component={BasariliDavetiye} />
        </Stack.Group>
        <Stack.Group>
            <Stack.Screen name="FeederDetail" component={FeederDetail}  options={{
                presentation: 'modal',
                headerShown:false,
                headerStyle:{
                    backgroundColor:'#f5f6fd'
                },
                cardStyle: { height: '50%' },
            }}/>
        </Stack.Group>
        {/*Modal Grubu*/}
        <Stack.Group>
            <Stack.Screen name="NotificationDetailModal" component={NotificationDetail}  options={{
                presentation: 'modal',
                headerShown:false,
                headerStyle:{
                    backgroundColor:'#f5f6fd'
                },
                cardStyle: { height: '50%' },
            }}/>
            <Stack.Screen name="GecmisTakviyeModal" component={GecmisTakviyeDetay}  options={{
                presentation: 'modal',
                headerShown:false,
                headerStyle:{
                    backgroundColor:'#f5f6fd'
                },
                cardStyle: { height: '50%' },
            }}/>
        </Stack.Group>
    </Stack.Navigator>
);

export default HomeStack;

