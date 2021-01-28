import { ActivationCard } from "./routes/home/components/ActivationCard";
import { AppLayout } from "./routes/home/components/AppLayout";
import { SidePanel } from "./routes/home/components/SidePanel";

export default function App() {
  return <AppLayout
    modalVisible={false}
    slots={{
      left: <SidePanel header="Title">
        <>
        <ActivationCard
          title="Example"
          progress={56}
          subtitle={'by Someone'}
          textLines={["1", "2", "3"]}
        />
        <ActivationCard
          title="Example"
          progress={22}
          subtitle={'by Someone'}
          textLines={["1", "2", "3"]}
        />
        </>
      </SidePanel>
    }}
  />
}