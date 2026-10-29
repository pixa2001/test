import data from "../data/partyraum.json";
/** Uses only the supplied asset. No substitute logo is generated. */
export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-logo ${small ? "brand-logo-small" : ""}`}>
      {data.brand.logo ? (
        <img
          src={import.meta.env.BASE_URL + data.brand.logo}
          alt={data.brand.logoAlt}
          width="180"
          height="180"
        />
      ) : (
        <span
          className="logo-placeholder"
          aria-label="Platz für das noch nicht bereitgestellte Original-Logo"
        >
          {data.brand.logoPending}
        </span>
      )}
    </span>
  );
}
