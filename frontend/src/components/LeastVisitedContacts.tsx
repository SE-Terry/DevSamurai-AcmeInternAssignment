import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ContactItem from './ContactItem'

const contactsData = [
  { name: 'Tham Tran', visits: 10, isCompany: false, logo: '/DevSamuraiLogo.png' },
  { name: 'DevSamurai', visits: 10, isCompany: true, logo: '/DevSamuraiLogo.png' },
  { name: 'Minh Dang', visits: 10, isCompany: false, logo: '/DevSamuraiLogo.png' },
  { name: 'Terry', visits: 9, isCompany: false },
  { name: 'Thuc Tran', visits: 10, isCompany: false, logo: '/DevSamuraiLogo.png' },
]

const leastVisitedContacts = [...contactsData].sort((a, b) => a.visits - b.visits) // Sort by visits ascending (least visited first)

export function LeastVisitedContacts() {
  return (
    <Card className="bg-transparent border-border" data-testid="least-visited-contacts">
      <CardHeader>
        <CardTitle className="text-card-foreground">Least visited contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leastVisitedContacts.map((contact, index) => (
            <ContactItem key={`${contact.name}-${index}`} contact={contact} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LeastVisitedContacts
