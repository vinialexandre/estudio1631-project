# Deploy no Vercel - Estúdio 1631

## Configuração Automática

1. **Conectar ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub/GitLab/Bitbucket
   - Clique em "New Project"
   - Selecione este repositório

2. **Configurações do Projeto:**
   - Framework: Next.js (detectado automaticamente)
   - Build Command: `npm run build`
   - Output Directory: `.next` (padrão)
   - Install Command: `npm install`

3. **Variáveis de Ambiente:**
   ```
   NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
   NEXT_PUBLIC_CONTACT_EMAIL=contato@1631.studio
   NEXT_PUBLIC_WHATSAPP_NUMBER=5500000000000
   ```

## Configurações Incluídas

- ✅ Otimização de imagens automática
- ✅ Cache de assets estáticos (1 ano)
- ✅ Headers de segurança
- ✅ Região Brasil (gru1) para melhor performance
- ✅ Timeout de 30s para funções

## Domínio Personalizado

1. No dashboard do Vercel, vá em "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

## Comandos Úteis

```bash
# Deploy local (opcional)
npx vercel

# Deploy de produção
npx vercel --prod
```