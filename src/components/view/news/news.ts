import { Article } from '../../../types';
import './news.css';

class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector(
            '#newsItemTemp'
        ) as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(
                true
            ) as DocumentFragment;

            const metaPhoto = newsClone.querySelector(
                '.news__meta-photo'
            ) as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }

            const author = newsClone.querySelector(
                '.news__meta-author'
            ) as HTMLElement;
            if (author) {
                author.textContent = item.author || item.source.name;
            }

            const date = newsClone.querySelector(
                '.news__meta-date'
            ) as HTMLElement;
            if (date) {
                const publishedAt = item.publishedAt
                    ? item.publishedAt.slice(0, 10).split('-').reverse().join('-')
                    : '';
                date.textContent = publishedAt;
            }

            const title = newsClone.querySelector(
                '.news__description-title'
            ) as HTMLElement;
            if (title) title.textContent = item.title;

            const source = newsClone.querySelector(
                '.news__description-source'
            ) as HTMLElement;
            if (source) source.textContent = item.source.name;

            const description = newsClone.querySelector(
                '.news__description-content'
            ) as HTMLElement;
            if (description) description.textContent = item.description || '';

            const readMoreLink = newsClone.querySelector(
                '.news__read-more a'
            ) as HTMLAnchorElement;
            if (readMoreLink) readMoreLink.setAttribute('href', item.url);

            if (idx % 2) {
                const newsItem = newsClone.querySelector(
                    '.news__item'
                ) as HTMLElement;
                if (newsItem) newsItem.classList.add('alt');
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLElement;
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;