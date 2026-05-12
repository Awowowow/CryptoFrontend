import {
  ExchangeOverview,
  SecurityPanel,
} from '../components/layout/OverviewPanel'
import { useSelector } from 'react-redux'
import { FundingMethods, PopularAssets, TrustAndSecurity } from '../components/layout/ProductSections'
import WebsiteHero from '../components/layout/WebsiteHero'

const OverviewPage = () => {
  const { recentTwoFaVerified, user } = useSelector((state) => state.auth)

  return (
    <div className="space-y-5">
      <WebsiteHero />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.78fr]">
        <section className="space-y-5">
          <ExchangeOverview user={user} recentTwoFaVerified={recentTwoFaVerified} />
          <PopularAssets />
          <FundingMethods />
        </section>

        <section className="space-y-5">
          <TrustAndSecurity />
          <SecurityPanel />
        </section>
      </div>
    </div>
  )
}

export default OverviewPage
