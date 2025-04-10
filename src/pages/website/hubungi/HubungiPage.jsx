import Icon from "@/components/ui/Icon"

const HubungiPage = () => {
  return (
    <section className="px-4 py-10 capitalize lg:px-32">
      <header className="flex flex-col gap-5 text-center pb-7">
        <h1 className="text-2xl font-bold md:text-4xl text-primary">hubungi kami</h1>
        <p className="text-base lowercase md:text-xl first-letter:capitalize">
          hubungi kami untuk mendapatkan informasi seputar layanan di Klinik Putri
        </p>
      </header>
      <article className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-5 p-6 rounded-lg sm:flex-row md:p-10 bg-primary">
          <div className="flex items-center justify-center p-5 bg-white rounded-full">
            <Icon name="phone" className="text-2xl text-primary md:text-3xl" />
          </div>
          <div className="flex flex-col gap-2 text-center text-white sm:text-left">
            <h2 className="text-lg font-medium md:text-xl">nomor telepon</h2>
            <p>+62 811-4814-142</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-6 rounded-lg sm:flex-row md:p-10 bg-primary">
          <div className="flex items-center justify-center p-5 bg-white rounded-full">
            <Icon name="facebook" className="text-2xl text-primary md:text-3xl" />
          </div>
          <div className="flex flex-col gap-2 text-center text-white sm:text-left">
            <h2 className="text-lg font-medium md:text-xl">facebook</h2>
            <p>Klinik Putri Wamena</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-6 rounded-lg sm:flex-row md:p-10 bg-primary">
          <div className="flex items-center justify-center p-5 bg-white rounded-full">
            <Icon name="whatsapp" className="text-2xl text-primary md:text-3xl" />
          </div>
          <div className="flex flex-col gap-2 text-center text-white sm:text-left">
            <h2 className="text-lg font-medium md:text-xl">whatsapp</h2>
            <p>+62 811-4814-142</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-6 rounded-lg sm:flex-row md:p-10 bg-primary">
          <div className="flex items-center justify-center p-5 bg-white rounded-full">
            <Icon name="map-marker" className="text-2xl text-primary md:text-3xl" />
          </div>
          <div className="flex flex-col gap-2 text-center text-white sm:text-left">
            <h2 className="text-lg font-medium md:text-xl">alamat</h2>
            <p>Jl. Trikora No.42, Wamena Kota.</p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default HubungiPage