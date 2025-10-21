export function InvoiceEmptyState() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
      <CardContent className="p-12 text-center">
        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Aucune facture créée
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Commencez par créer votre première facture pour gérer vos revenus et suivre vos transactions.
        </p>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Créer une facture
        </Button>
      </CardContent>
    </Card>
  );
}