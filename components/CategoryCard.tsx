import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  image: string;
  slug: string;
  count?: number;
}

export default function CategoryCard({ title, image, slug, count }: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${slug}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {count && (
          <p className="text-sm text-gray-500 mt-1">
            {count} dibujos
          </p>
        )}
      </div>
    </Link>
  );
}
