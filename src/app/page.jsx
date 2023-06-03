import Clicker from "@/components/main/Clicker"
import Purchasables from "@/components/main/Purchasables"

export default function Home() {
    return (
        <main className="grid grid-cols-3 w-screen h-screen">
            <div></div>
            <Clicker />
            <Purchasables />
        </main>
    )
}
