//elma5zan

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import orgSlice from "./Slice/orgSlice";
import userOrgSlice from "./Slice/userOrgSlice";
import formSlice from "./Slice/formSlice";
import airDeviceSlice from "./Slice/airDeviceSlice";
import zoneSlice from "./Slice/zoneSlice";
import localizationSlice from "./Slice/localizationSlice";
import reportSlice from "./Slice/reportSlice";
import planSlice from "./Slice/planSlice";
import toastSlice from "./Slice/toastSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    organization: orgSlice,
    userOrgs: userOrgSlice,
    form: formSlice,
    airDevice: airDeviceSlice,
    zone: zoneSlice,
    localization: localizationSlice,
    report: reportSlice,
    plan: planSlice,
    toast: toastSlice,
  },
});

export default store;
