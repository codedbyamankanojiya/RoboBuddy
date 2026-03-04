type Props = {
  resource: {
    title: string;
    subject: string;
    url: string;
  };
};

export function ResourceCard({ resource }: Props) {
  return (
    <a
      className="block rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50 hover:ring-primary/20 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      href={resource.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="text-sm font-medium">{resource.title}</div>
      <div className="text-xs text-zinc-500">{resource.subject}</div>
      <div className="mt-2 text-xs text-zinc-600 break-all">{resource.url}</div>
    </a>
  );
}
