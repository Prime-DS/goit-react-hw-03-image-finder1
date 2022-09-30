import React, { Component } from 'react'
import SearchForm from './SearchForm/SearchForm';
import { searchImages } from 'components/api/post';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import styles from "./searchbar.module.scss";

export default class Searchbar extends Component {
    state = {
        items: [],
        loading: false,
        error: null,
        search:"",
      page: 1,
      modalOpen: false,
      largeImageURL: "",
  }

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if ((search && prevState.search !== search) ||
    page> prevState.page)
    this.featchImage(search, page);
  }
async featchImage() {
        const { search, page } = this.state;
        this.setState({
            loading:true,
        })

        try {
            const data = await searchImages(search, page);
          this.setState(({ items }) => { 
            return {
              items: [...items, ...data.hits],
            }
          });

        } catch (error) {
            this.setState({
                error
            })
        } finally {
            this.setState({
            loading:false,
        })
        }
    }


   onSearch = ({ search }) => {
        this.setState({
            search,
        })
  }

  openModal = (largeImageURL) => {
    this.setState({
      modalOpen: true,
      largeImageURL: largeImageURL,
    })
  }
  
  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: {
        title:"",
      }
  })
}

    render() {
      const { items, loading, error,modalOpen,largeImageURL } = this.state;
      const { onSearch,closeModal,openModal } = this;
      const isImage = Boolean(items.length);
        return (
            <div className={styles.Searchbar}>
            {modalOpen && <Modal onClose={closeModal}>
              <img src={largeImageURL.largeImageURL} alt="foto cat" ></img>
              
            </Modal>}
            <SearchForm onSubmit={onSearch} />
            {loading && <Loader />}
            {error && <p>Будь ласка спробуйте пізніе!</p>}
            {isImage&& <ImageGallery items={items} onClick={openModal} />}
            </div>
    )
  }
}
