import Icon from "@/components/ui/Icon"
import useFooterQueries from "@/hooks/admin/footer/useFooterQueries"
import KlinikPutriLogo from '@/assets/logo/klinik-putri.png'

const Footer = () => {
  const { getById } = useFooterQueries()
  const data = getById.data || {}

  // Fungsi untuk memformat nomor telepon
  const formatPhone = (phone) => {
    if (!phone) return ""
    // Jika nomor dimulai dengan "0", ganti dengan "+62"
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.substring(1)
    }
    // Jika format setelah "+62 " memiliki tepat 10 digit, masukkan dash
    if (phone.startsWith("+62 ")) {
      const number = phone.slice(4) // misal "8114814142"
      if (number.length === 10) {
        return "+62 " + number.slice(0, 3) + "-" + number.slice(3, 7) + "-" + number.slice(7)
      }
    }
    return phone
  }

  return (
    <footer className="capitalize bg-white">
      <section className="grid grid-cols-1 px-4 md:grid-cols-3 md:px-32 py-7">
        <article>
          <img src={KlinikPutriLogo} alt="" width={70} className="mb-7" />
          <p>{data.alamat || ""}</p>
        </article>
        <article>
          <h2 className="text-2xl font-bold text-primary mb-7">menu</h2>
          <div className="flex flex-col space-y-4">
            <p>beranda</p>
            <p>daftar dokter</p>
            <p>hubungi</p>
          </div>
        </article>
        <article>
          <h2 className="text-2xl font-bold text-primary mb-7">hubungi kami</h2>
          <div className="flex flex-col space-y-4">
            <p className="flex items-center gap-2">
              <span><Icon name="phone" /></span>
              {formatPhone(data.telepon) || ""}
            </p>
            <p className="flex items-center gap-2">
              <span><Icon name="whatsapp" /></span>
              {formatPhone(data.whatsapp) || ""}
            </p>
            <p className="flex items-center gap-2">
              <span><Icon name="facebook" /></span>
              Klinik Putri Wamena
            </p>
          </div>
        </article>
      </section>
      <section className="text-center py-7 border border-t-[#8E8E8E]">
        <p>© 2024 <b>Klinik Putri Wamena</b>.All rights reserved.</p>
      </section>
    </footer>
  )
}

export default Footer