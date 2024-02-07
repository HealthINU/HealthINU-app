import { Switch } from "react-native";
import { useState } from "react";

import { Colors } from "../../constant/Color";

function ToggleSwitch() {
  //토글 스위치 전용
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Switch
      trackColor={{ false: Colors.gray1, true: Colors.green1 }}
      thumbColor={Colors.white1}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}

export default ToggleSwitch;
